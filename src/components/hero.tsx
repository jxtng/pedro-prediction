import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section
      className="relative bg-black text-white bg-cover bg-center py-20 px-6 sm:py-24 sm:px-12 md:px-16 lg:py-28"
      style={{ backgroundImage: "url('/images/hero-bg.png')" }}
    >
      <div className="overlay absolute inset-0 bg-black bg-opacity-50" />
      <div className="flex max-md:flex-col gap-8 relative z-10">
        <div className="hero-content basis-2/3 max-md:text-center text-white max-w-3xl mx-auto">
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Predict & Win Big!
          </h1>
          <p className="mt-4 text-base sm:text-lg lg:text-xl">
            Join millions of football fans predicting match outcomes. Experience
            the thrill of football predictions, compete with others, and win big
            with every accurate guess.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row max-md:justify-center">
            <Button className="bg-red-600 w-full sm:w-auto">Join Now</Button>
            <Button variant="outline" className="bg-transparent">
              How to play
            </Button>
          </div>
        </div>
        <div className="upcoming-match basis-1/3 space-y-2 backdrop-blur-[2px] max-w-sm mx-auto p-4 bg-gray-800/20 text-white rounded-2xl shadow-lg">
          {/* Logos and Team Names */}
          <div className="flex items-center justify-center gap-4">
            <img
              src="/images/teams/real-madrid.svg"
              alt="Real Madrid Logo"
              className="size-24 object-cover"
            />
            <img
              src="/images/teams/man-united.svg"
              alt="Manchester United Logo"
              className="size-24 object-cover"
            />
          </div>
          <div className="text-right">
            <h2 className="text-lg font-bold">Real Madrid</h2>
            <h3 className="text-gray-400">Manchester United</h3>
          </div>

          {/* Match Time and Best Bet */}
          <div className="flex justify-between text-sm text-gray-400">
            <span>15:00</span>
            <span>
              Best Bet: <span className="text-green-500 font-bold">1X</span>
            </span>
          </div>

          <div className="px-4 py-1 w-full bg-[lime] text-center text-black">
            Home to win or draw
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
