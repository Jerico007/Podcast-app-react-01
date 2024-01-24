

// eslint-disable-next-line react/prop-types
const Button = ({id,className,text,callback,type}) => {
    return (
        <>
          <button type={type} id={id} className={className} onClick={callback}>{text}</button>  
        </>
    );
}

export default Button;
