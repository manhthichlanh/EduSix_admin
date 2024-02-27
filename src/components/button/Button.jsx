const Button = (props) => {
  const { text, style, Class, Icon, id, onClick } = props;
  console.log(Icon)
  return (
    <div>
      <button
        style={style}
        id={"" + id}
        className={" " + Class}
        onClick={onClick}
      >
        {Icon && Icon}
        {text}
      </button>
    </div>
  );
};

export default Button;
