import Poster from "@/components/poster/Poster";

const Home = () => {
    return (
      <div className='p-8'>
        <Poster
          src='https://picsum.photos/300/450'
        />

        <Poster
          src='https://cdn.imweb.me/upload/S20200106a105fd03f4b57/74acf364c7b51.jpg'
                shadow={false}
                size="xl"
        />
      </div>
    );
    
}

export default Home;
