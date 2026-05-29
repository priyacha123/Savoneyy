import { SignUp } from '@clerk/react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden hero-gradient font-sans px-4">
      {/* Background radial blurs */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-secondary/10 blur-[150px] rounded-full"></div>
      </div>

      {/* Back to Home Header */}
      <div className="absolute top-6 left-6 z-20">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-primary font-bold text-sm bg-white/80 hover:bg-white border border-outline-variant/30 px-4 py-2 rounded-full shadow-sm transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to Home
        </button>
      </div>

      {/* Center Card Wrapper */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-6">
        <div className="text-headline-md font-bold tracking-tight text-primary flex items-center gap-2 select-none mb-2">
          <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
          Savoney
        </div>
        <SignUp signInUrl="/login" forceRedirectUrl="/dashboard" />
      </div>
    </div>
  );
};

export default Signup;