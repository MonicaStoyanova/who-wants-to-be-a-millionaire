import FiftyFiftyJoker from "./FiftyFifty/FiftyFiftyJoker";
import AudienceHelpJoker from "./Audience/AudienceHelpJoker";
import CallFriendJoker from "./CallFriend/CallFriendJoker";

import styles from "./Jokers.module.css";

const Jokers = () => {
  return (
    <div className={styles.jokers}>
      <FiftyFiftyJoker />
      <AudienceHelpJoker />
      <CallFriendJoker />
    </div>
  );
};

export default Jokers;
