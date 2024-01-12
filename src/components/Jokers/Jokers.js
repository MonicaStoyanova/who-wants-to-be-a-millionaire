import FiftyFiftyJoker from "./FiftyFifty/FiftyFiftyJoker";
import AudienceHelpJoker from "./Audience/AudienceHelpJoker";

import styles from "./Jokers.module.css";

const Jokers = () => {
  const handleCallFriend = () => {};

  return (
    <>
      <div className={styles.jokers}>
        <FiftyFiftyJoker />

        <AudienceHelpJoker />
        <button className={styles.call} onClick={handleCallFriend}></button>
      </div>
    </>
  );
};

export default Jokers;
