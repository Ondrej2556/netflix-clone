import LoggedNavbar from "@/components/navbar/loggedNavbar";

const Genre = ({ params }: { params: { id: string } }) => (
    <div>My Post: {params.id}</div>
  );
  
  export default Genre;