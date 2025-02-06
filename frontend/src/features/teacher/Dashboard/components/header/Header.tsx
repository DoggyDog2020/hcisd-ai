import './Header.css';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img 
          src="https://core-docs.s3.us-east-1.amazonaws.com/documents/asset/uploaded_file/4681/district/4052380/logoandwordmark_white.png" 
          alt="HCISD Banner" 
          className="header__banner" 
        />
      </div>
      <h1 className="header__title">HCISD Teacher Chat AI</h1>
    </header>
  );
};
