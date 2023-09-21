const Button = (props) => {
  const { text, style, Class, Icon, id, onClick } = props;
  return (
    <div>
      <button
        style={style}
        id={"" + id}
        className={" " + Class}
        onClick={onClick}
      >
        {Icon && <Icon></Icon>}
        {text}
      </button>
    </div>
  );
};

export default Button;
