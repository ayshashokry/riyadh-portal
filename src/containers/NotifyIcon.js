import React, { Component } from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import {
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from "@microsoft/signalr";
import { Menu, Dropdown, Badge, Skeleton, Avatar, Modal, Comment } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment-hijri";
import PropTypes from "prop-types";

class NotifyIcon extends Component {
  state = {
    connection: null,
    notifications: [],
    unseenCount: 0,
    isDropDownOpen: false,
    isModalOpen: false,
    nextPage: 2,
    offlineNotificationsCount: 0,
    offlineLastCreatedAt: null,
    isFetchingMore: false,
  };

  appsQueryString = "";

  componentDidMount = async () => {
    try {
      const { appsIds, userToken, baseUrl } = this.props;
      appsIds.forEach((id) => (this.appsQueryString += `&appId=${id}`));

      console.log("init hub connect");
      const connection = new HubConnectionBuilder()
        .withUrl(`${baseUrl}/notify-hub?${this.appsQueryString}`, {
          accessTokenFactory: () => userToken,
        })
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("offlineNotifications", (notifications, unseenCount) => {
        // Notifications come arranged by createdAt descendingly,
        // i.e. the first notification is the latest one.
        this.setState({
          notifications,
          unseenCount,
          offlineNotificationsCount: notifications.length,
          offlineLastCreatedAt: notifications[0].createdAt,
        });
      });

      connection.on("clickedAck", (notificationId) => {
        const notifications = [...this.state.notifications];
        const clickedIndex = notifications.findIndex(
          (n) => n.id === notificationId
        );
        const clickedNotification = {
          ...notifications[clickedIndex],
          isClicked: true,
        };
        notifications[clickedIndex] = clickedNotification;
        this.setState({ notifications });
      });

      connection.on("seenAck", (dateTime, numUpdates) => {
        const { unseenCount } = this.state;
        const notifications = [...this.state.notifications];
        const lastSeenIndex = notifications.findIndex(
          (n) => n.createdAt === dateTime
        );

        for (
          let i = lastSeenIndex;
          i < notifications.length && !notifications[i].isSeen;
          i++
        ) {
          const notification = {
            ...notifications[i],
            isSeen: true,
          };
          notifications[i] = notification;
        }
        this.setState({ unseenCount: unseenCount - numUpdates }, () => {
          setTimeout(() => {
            this.setState({ notifications });
          }, 1000);
        });
      });

      connection.on("newNotification", (newNotification) => {
        const { appsIds } = this.props;
        if (appsIds.includes(newNotification.appId)) {
          let { notifications, unseenCount } = this.state;
          notifications = [newNotification, ...notifications];
          unseenCount += 1;
          this.setState({ notifications, unseenCount }, () => {
            this.markNotificationsAsSeenIfAllowed();
          });
        }
      });

      document.onvisibilitychange = () => {
        if (document.visibilityState === "visible") {
          const { connection, isDropDownOpen, isModalOpen } = this.state;
          const isNotificationsOpen = isDropDownOpen || isModalOpen;
          if (connection.state !== HubConnectionState.Connected)
            this.setState(
              { isDropDownOpen: false, isModalOpen: false },
              async () => {
                await connection.start();
              }
            );
          else if (isNotificationsOpen) this.markNotificationsAsSeenIfAllowed();
        }
      };

      this.setState({ connection });

      await connection.start();
    } catch (e) {
      console.log(e);
    }
  };

  onNotificationClicked = (notification) => {
    const { connection } = this.state;
    const { handleNotificationClick } = this.props;

    if (notification.title === "submnStatus") {
      var apps = [
        JSON.parse(localStorage.getItem("user")).groups.map((x) =>
          x.groups_permissions.map((f) => f.applications)
        ),
      ].flat(2);

      var notificationApp = apps.find((app) => app.id === notification.appId);
      if (
        window.newTabShowWizardApps.find(
          (x) => notificationApp.name.indexOf(x) > -1
        )
      ) {
        let sub_id = JSON.parse(notification.payload).submissionId;
        this.setState({ isDropDownOpen: false });
        window.open(
          window.openWizardUrl +
            "#/wizardById/" +
            sub_id +
            "?tk=" +
            localStorage.token +
            "&appname=" +
            notificationApp.name +
            "&appId=" +
            notificationApp.id,
          "_blank"
        );
      }
    }

    if (!notification.isClicked)
      connection.invoke("MarkAsClicked", notification.id);
    if (handleNotificationClick instanceof Function)
      handleNotificationClick(notification);
  };

  onDropdownVisiblityChange = (visible) => {
    if (visible) {
      this.setState({ isDropDownOpen: true }, () => {
        this.markNotificationsAsSeen();
      });
    } else this.setState({ isDropDownOpen: false });
  };

  markNotificationsAsSeenIfAllowed = () => {
    let { isDropDownOpen, isModalOpen } = this.state;
    const isNotificationsOpen = isDropDownOpen || isModalOpen;
    if (document.visibilityState === "visible" && isNotificationsOpen) {
      if (
        isModalOpen &&
        document.getElementById("modal").scrollTop >
          document.getElementById("modal-n-0").offsetHeight / 2
      )
        return;
      else this.markNotificationsAsSeen();
    }
  };

  markNotificationsAsSeen = () => {
    const { connection, notifications } = this.state;
    const { appsIds } = this.props;
    const mostRecentNotification = notifications[0];
    if (mostRecentNotification && !mostRecentNotification.isSeen) {
      connection.invoke(
        "MarkAsSeenTill",
        appsIds,
        mostRecentNotification.createdAt
      );
    }
  };

  fetchMoreNotifications = () => {
    const { userToken } = this.props;
    let {
      nextPage,
      notifications,
      offlineNotificationsCount,
      offlineLastCreatedAt,
    } = this.state;
    const { baseUrl } = this.props;
    this.setState({ isFetchingMore: true }, async () => {
      const request = new Request(
        baseUrl +
          `/notifications?${this.appsQueryString}&fromDate=${offlineLastCreatedAt}&pageIndex=${nextPage}&itemsPerPage=${offlineNotificationsCount}`,
        {
          headers: {
            authorization: `bearer ${userToken}`,
          },
        }
      );
      const response = await fetch(request);
      if (response.ok) {
        const jResponse = await response.json();
        notifications = [...notifications, ...jResponse.notifications];
        nextPage = jResponse.hasNextPage ? nextPage + 1 : null;
        this.setState({ notifications, nextPage, isFetchingMore: false });
      }
    });
  };

  handleModalScroll = async () => {
    if (
      document.getElementById("modal").scrollTop <
      document.getElementById("modal-n-0").offsetHeight / 2
    ) {
      this.markNotificationsAsSeen();
    }
  };

  render = () => {
    const {
      notifications,
      unseenCount,
      isDropDownOpen,
      isModalOpen,
      nextPage,
      isFetchingMore,
    } = this.state;

    const { generateNotification } = this.props;

    const menu =
      notifications.length > 0 ? (
        <Menu
          className="notificationIconMenu"
          // getPopupContainer={(trigger) => trigger.parentNode}
        >
          {notifications.slice(0, 9).map((n, i) => {
            return (
              <Menu.Item
                key={`n-${i}`}
                id={`n-${i}`}
                onClick={() => {
                  this.onNotificationClicked(n);
                }}
                style={{
                  backgroundColor: !n.isSeen
                    ? "#f7ffeb"
                    : n.isClicked
                    ? "#fff"
                    : "#f0f2f5",
                  marginBottom: "1px",
                }}
              >
                <div className="dropdown-notification">
                  <Comment
                    style={{ padding: 0, margin: 0 }}
                    content={generateNotification(n)}
                    datetime={moment(new Date(n.createdAt))
                      .format("iYYYY/iMM/iDD hh:mm A")
                      .toLocaleLowerCase()
                      .replace("am", "ص")
                      .replace("pm", "م")}
                  />
                </div>
              </Menu.Item>
            );
          })}
          <hr />
          <p
            className="seeAllComments"
            onClick={() => {
              this.setState({ isDropDownOpen: false, isModalOpen: true });
            }}
          >
            مشاهدة الكل
          </p>
        </Menu>
      ) : (
        <Menu className="notNotification">ليس لديك تنبيهات</Menu>
      );

    const modalMenu = (
      <Menu>
        {notifications.map((n, i) => {
          return (
            <Menu.Item
              key={`modal-n-${i}`}
              id={`modal-n-${i}`}
              onClick={() => {
                this.onNotificationClicked(n);
              }}
              style={{
                backgroundColor: !n.isSeen
                  ? "#f7ffeb"
                  : n.isClicked
                  ? "#fff"
                  : "#f0f2f5",
                marginBottom: "1px",
                height: "100%",
              }}
            >
              <Comment
                content={generateNotification(n)}
                datetime={moment(new Date(n.createdAt))
                  .format("iYYYY/iMM/iDD hh:mm A")
                  .toLocaleLowerCase()
                  .replace("am", "ص")
                  .replace("pm", "م")}
              />
            </Menu.Item>
          );
        })}
      </Menu>
    );

    return (
      <div>
        <Badge
          count={isDropDownOpen ? 0 : unseenCount}
          overflowCount={99}
          style={{ backgroundColor: "#fc6464" }}
          className="hahha"
        >
          <Avatar
            shape="square"
            style={{ color: "#025358", backgroundColor: "#fff" }}
          >
            <Dropdown
              overlayClassName="notificationIconDrop "
              overlay={menu}
              placement="bottomCenter"
              trigger={["click"]}
              onVisibleChange={(visible) =>
                this.onDropdownVisiblityChange(visible)
              }
              visible={isDropDownOpen}
            >
              <NotificationsIcon />
            </Dropdown>
          </Avatar>
        </Badge>
        <Modal
          className="notifModal"
          visible={isModalOpen}
          footer={null}
          onCancel={() => {
            this.setState({ isModalOpen: false });
          }}
        >
          <div
            id="modal"
            style={{ height: "500px", overflow: "scroll" }}
            onScroll={this.handleModalScroll}
          >
            <InfiniteScroll
              dataLength={notifications.length}
              next={this.fetchMoreNotifications}
              hasMore={nextPage !== null}
              loader={isFetchingMore ? <Skeleton active /> : null}
              scrollableTarget="modal"
            >
              {modalMenu}
            </InfiniteScroll>
          </div>
        </Modal>
        <style>
          {`.dropdown-notification .ant-comment-inner{
            padding: 5px 0;
          }
          .dropdown-notification .ant-comment-content-author{
            margin-bottom: 2px;
          } 
          `}
        </style>
      </div>
    );
  };
}

NotifyIcon.propTypes = {
  appsIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  userToken: PropTypes.string.isRequired,
  generateNotification: PropTypes.func.isRequired,
  baseUrl: PropTypes.string.isRequired,
  handleNotificationClick: PropTypes.func,
};

export default NotifyIcon;
