import Feed from "@components/Feed";

const Home = () => {
  return (
    <div className="w-full flex-center flex-col">
      <section>
        <h1 className="head_text text-center">
          Discover and Share
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center"> awesome propmts</span>
        </h1>

        <p className="desc text-right">
          PromptCraft is a AI powered prompt generating tool which help users to
          generate and share prompts with their collegues.
        </p>

        <Feed></Feed>
      </section>
    </div>
  );
};
export default Home;
