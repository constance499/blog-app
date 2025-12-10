
import { BsQuote } from 'react-icons/bs'; 

const Readers = () => {
  return (
    <section className="testimonial-section py-5 my-5">
      <div className="container">
        
        {/* Centers all content */}
        <div className="text-center">
          
          {/* Large Quote Icon */}
          <BsQuote size={60} className="text-primary mb-3" style={{ opacity: 0.8 }} />
          
          {/* Main Heading */}
          <h2 className="display-4 fw-bold mb-4">
            What Readers Say
          </h2>
          
          {/* Quote/Testimonial Text - Constrained Width */}
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <p className="lead fst-italic text-secondary mb-4">
                "Sophia's blog is a treasure trove of inspiration and insight. Her travel stories transport you to new worlds, while her tech tips and wellness advice have genuinely improved my daily routine. I always look forward to her latest posts. It's like getting a dose of motivation straight to my inbox!"
              </p>
            </div>
          </div>
          
          <p className="fw-bold text-dark mt-3">
            Emily Thompson
          </p>
          
        </div>
      </div>
    </section>
  );
};

export default Readers;
