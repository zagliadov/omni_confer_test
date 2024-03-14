import cx from "classnames";
import { Mic, Video, PhoneOff, MicOff, VideoOff, UserPlus, MonitorUp, MessageCircle } from "lucide-react";
import styles from "@/component/Bottom/index.module.css";

const Bottom = (props) => {
  const { muted, playing, toggleAudio, toggleVideo, leaveRoom, copyInviteLink, shareScreen, chatOpen } = props;

  return (
    <div className={styles.bottomMenu}>
      {muted ? (
        <MicOff
          className={cx(styles.icon, styles.active)}
          size={55}
          onClick={toggleAudio}
        />
      ) : (
        <Mic className={styles.icon} size={55} onClick={toggleAudio} />
      )}
      {playing ? (
        <Video className={styles.icon} size={55} onClick={toggleVideo} />
      ) : (
        <VideoOff
          className={cx(styles.icon, styles.active)}
          size={55}
          onClick={toggleVideo}
        />
      )}
      <PhoneOff size={55} className={cx(styles.icon)} onClick={leaveRoom}/>
      <UserPlus size={55} className={cx(styles.icon)} onClick={copyInviteLink} />
      <MonitorUp size={55} className={cx(styles.icon)} onClick={shareScreen} />
      <MessageCircle size={55} className={cx(styles.icon)} onClick={chatOpen} />
    </div>
  );
};

export default Bottom;
