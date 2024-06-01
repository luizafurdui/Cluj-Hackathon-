const TextWithNewlines = ({ text, className }) => {
    // Split the text by newline characters into an array of lines
    const lines = text.split('\n');
  
    return (
      <div>
        {lines.map((line, index) => (
          <p className={className} key={index}>{line}</p>
        ))}
      </div>
    );
  };
  
  export default TextWithNewlines;
  