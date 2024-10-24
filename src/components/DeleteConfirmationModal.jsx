import { AnimatePresence, motion } from "framer-motion";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, order }) => {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <motion.div
          className="bg-gray-900 rounded-lg p-6 shadow-xl"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
        >
          <h2 className="text-lg font-bold text-yellow-500 mb-4">
            Confirm Delete
          </h2>
          <p className="text-gray-300">
            Are you sure you want to delete order #{order.order_id}?
          </p>
          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="mr-2 p-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm(order);
                onClose();
              }}
              className="p-2 bg-red-500 rounded-lg text-white hover:bg-red-400"
            >
              Delete
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DeleteConfirmationModal;
