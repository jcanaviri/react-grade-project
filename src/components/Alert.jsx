export const Alert = ({ message, type, closeAlert }) => {
  return (
    <div
      className={`flex p-4 mb-4 
      ${type === 'info' && 'bg-yellow-100 rounded-lg dark:bg-yellow-200'}
      ${type === 'danger' && 'bg-red-100 rounded-lg dark:bg-red-200'}
      ${type === 'success' && 'bg-green-100 rounded-lg dark:bg-green-200'}
      `}
      role="alert"
    >
      <div
        className={`ml-3 text-sm font-medium 
        ${type === 'info' && 'text-yellow-700 dark:text-yellow-800'}
        ${type === 'danger' && 'text-red-700 dark:text-red-800'}
        ${type === 'success' && 'text-green-700 dark:text-green-800'}
        `}
      >
        {message}
      </div>
      <button
        type="button"
        className={`ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-lg inline-flex h-8 w-8 
        ${
          type === 'info' &&
          'bg-yellow-100 text-yellow-500 focus:ring-2 focus:ring-yellow-400 hover:bg-yellow-200 border border-yellow-500'
        } 
        ${
          type === 'danger' &&
          'bg-red-100 text-red-500 focus:ring-2 focus:ring-red-400 hover:bg-red-200 border border-red-500'
        } 
        ${
          type === 'success' &&
          'bg-green-100 text-green-500 focus:ring-2 focus:ring-green-400 hover:bg-green-200 border border-green-500'
        } 
        `}
        data-dismiss-target="#alert-4"
        aria-label="Close"
        onClick={closeAlert}
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  )
}
