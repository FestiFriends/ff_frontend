import Poster from "@/components/poster/Poster";

const Home = () => {
    return (
      <div className='p-8'>
        <Poster
          src='https://picsum.photos/300/450'
          className='mb-4'
        />

        <Poster
          src='https://cdn.imweb.me/upload/S20200106a105fd03f4b57/74acf364c7b51.jpg'
          shadow={false}
          className='h-60 w-40'
        />
      </div>
    );
    
}

export default Home;
