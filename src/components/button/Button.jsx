const Button = (props) => {
  const { text, style, Class, Icon, onClick } = props;
  // console.log(Icon);
  return (
    <div>
      <button style={style} className={" " + Class} onClick={onClick}>
        {Icon && <Icon></Icon>}
        {text}
      </button>
    </div>
  );
};

export default Button;
