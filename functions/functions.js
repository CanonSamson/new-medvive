// Function to get the doctor's first name
export function getUserFirstName(user) {
    if (!user?.name) return "";
  
    const nameParts = user.name.split(" ");
    return nameParts.length > 0 ? nameParts[0] : user.name;
  }
  