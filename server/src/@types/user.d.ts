interface UserInterface {
  email: string;
  password: string;
  name: string;
  profilePic: string;
  role: "oompaloompa" | "customer";
  isManager: true | false;
  tasks: [];
  notifs: [];
  location: string;
}
