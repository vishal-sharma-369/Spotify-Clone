const TextInput = ({
  label,
  placeholder,
  className,
  value,
  setValue,
}) => {
  const handleChange = (e)=>
  {
    console.log(e);
    setValue(e.target.value);
  }
  return (
    <div className={`textInputDiv flex flex-col space-y-2 w-full ${className}`}>
      <label htmlFor={label} className={`font-semibold text-white`}>
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className={`p-3 border  border-gray-400 border-solid rounded placeholder-gray-500`}
        id={label}
        value={value}
        onChange={(event)=>handleChange(event)}
      />
    </div>
  );
};

export default TextInput;
