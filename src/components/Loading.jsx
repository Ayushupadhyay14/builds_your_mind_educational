import { FaGraduationCap } from 'react-icons/fa';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-brand-blue border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <FaGraduationCap className="text-brand-blue text-2xl animate-pulse" />
          </div>
        </div>
        <p className="text-brand-blue font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
