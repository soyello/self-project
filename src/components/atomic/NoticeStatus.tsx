interface Props {
  bgColor: string;
  stateText: string;
}

const NoticeStatus = ({ bgColor, stateText }: Props) => {
  return <div className={`${bgColor} rounded-2xl py-1 px-3`}>{stateText}</div>;
};

export default NoticeStatus;
