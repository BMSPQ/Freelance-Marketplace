import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedFreelancers from "../components/FeaturedFreelancers";
import LatestProjects from "../components/LatestProjects";
import HowItWorks from "../components/HowItWorks";
import Statistics from "../components/Statistics";
import Testimonials from "../components/Testimonials";

function Home() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    setLoading(true);

    try {
      const res = await API.get("/home");
      setHomeData(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load home page");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h3>Loading Home Page...</h3>
      </div>
    );
  }

  if (!homeData) {
    return (
      <div className="container py-5 text-center">
        <h3>Unable to load data.</h3>

        <button
          className="btn btn-primary mt-3"
          onClick={fetchHomeData}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <Hero statistics={homeData.statistics} />

      <Categories categories={homeData.categories} />

      <FeaturedFreelancers
        freelancers={homeData.featuredFreelancers}
      />

      <LatestProjects
        projects={homeData.latestProjects}
      />

      <HowItWorks />

      <Statistics
        statistics={homeData.statistics}
      />

      <Testimonials />
    </>
  );
}

export default Home;