'use client';

import { motion } from 'framer-motion';

export default function FloatingWhatsApp() {
  const whatsappNumber = '50760000000'; // Authorized advisory line
  const prefilledText = encodeURIComponent(
    'Hello Global Realty Panama, I would like to schedule a private real estate consultation.'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${prefilledText}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass-panel flex items-center justify-center border border-gold/40 shadow-2xl hover:border-emerald-500 cursor-pointer select-none text-gold hover:text-white"
      initial={{ opacity: 0, scale: 0.8, y: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: [0, -8, 0]
      }}
      whileHover={{ 
        scale: 1.1,
        backgroundColor: 'rgba(16, 185, 129, 0.9)', // Emerald green
        borderColor: 'rgba(16, 185, 129, 0.4)'
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        opacity: { duration: 0.5, delay: 1 },
        scale: { duration: 0.5, delay: 1 },
        y: {
          repeat: Infinity,
          duration: 3.5,
          ease: 'easeInOut'
        }
      }}
    >
      {/* Premium WhatsApp Icon Path */}
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6 fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.01 14.069.99 11.999.99c-5.437 0-9.862 4.37-9.866 9.8.001 2.019.538 3.992 1.554 5.75L2.68 20.2l4.008-.95c.002 0-.041.004-.041.004zM18.06 14.9c-.33-.165-1.953-.964-2.253-1.074-.3-.109-.518-.165-.736.165-.218.33-.846 1.074-1.037 1.293-.19.218-.38.245-.71.08-.33-.165-1.393-.513-2.653-1.637-.984-.877-1.648-1.96-1.84-2.29-.19-.33-.02-.508.145-.671.147-.146.33-.385.495-.578.165-.19.22-.33.33-.55.11-.22.055-.413-.028-.578-.083-.165-.736-1.775-1.008-2.434-.265-.636-.53-.55-.736-.56-.19-.01-.408-.012-.625-.012-.218 0-.573.082-.873.407-.3.33-1.145 1.116-1.145 2.72 0 1.605 1.172 3.159 1.334 3.38.163.22 2.307 3.524 5.59 4.943.78.337 1.39.538 1.86.687.784.249 1.497.214 2.062.13.629-.094 1.953-.798 2.227-1.57.275-.77.275-1.43.193-1.57-.083-.14-.3-.22-.63-.385z" />
      </svg>
    </motion.a>
  );
}
