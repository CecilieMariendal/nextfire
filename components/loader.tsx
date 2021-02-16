export default function Loader({ show }) {
    return (! show) ? null : (
      <div className="loader">
        <span className="circle"></span>
        <span className="circle"></span>
        <span className="circle"></span> 
        <span className="circle"></span>
      </div>
    );
  }