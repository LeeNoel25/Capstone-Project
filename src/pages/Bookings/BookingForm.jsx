const BookingForm = ({ selectGroomer, selectLocation, handleChange, fetchedLocations, memberInfo}) => {
    const token = localStorage.getItem("token")
    const Name =  JSON.parse(window.atob(token.split(".")[1]))
    const memberName = Name.member.name
    const memberEmail = Name.member.email
    handleChange({ target: { name: "name", value: memberName } });
    handleChange({ target: { name: "email", value: memberEmail } });
  
    return (
      <>
        <label>Name:</label>
        <input type="text" name="name" value={memberInfo.name} onChange={handleChange} />
        <br />
        <label>Email:</label>
        <input type="text" name="email" value={memberInfo.email} onChange={handleChange} />
  
        <label htmlFor="location">Choose a location:</label>
  
        <select name="location" onChange={handleChange}>
          <option value="">--Please choose location</option>
          {fetchedLocations &&
            fetchedLocations.map((location, index) => {
              return (
                <option key={index} value={location._id}>
                  {location.name}
                </option>
              );
            })}
        </select>
  
        {selectLocation && (
          <select name="groomer" onChange={handleChange}>
            <option value="">--Please select Groomer</option>
            {selectGroomer.map((Groomer, index) => (
              <option key={index} value={Groomer.name}>
                {" "}
                {Groomer.name}
              </option>
            ))}
          </select>
        )}
      </>
    );
  };
  
  export default BookingForm;