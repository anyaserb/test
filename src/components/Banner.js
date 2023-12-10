import "./Banner.scss";

const Banner = () => {
  return (
    <section className="banner-section">
      <div className="banner-dark-background">
        <div className="banner-container">
          <h1>Test assignment for front-end developer</h1>
          <div>
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </div>
          <a href="#post-section">Sign up</a>
        </div>
      </div>
    </section>
  );
};

export default Banner;
