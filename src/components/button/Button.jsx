const Button = (props) => {
  const { text, style, Class, Icon, id } = props;
  return (
    <div>
      <button style={style} id={"" + id} className={" " + Class}>
        {Icon && <Icon></Icon>}
        {text}
      </button>
    </div>
  );
};

export default Button;
