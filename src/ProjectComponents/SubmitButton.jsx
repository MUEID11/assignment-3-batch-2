export default function SubmitButton({ children, bgColor, bgHover,buttonType, onSmash }) {
  return (
    <button
      type={buttonType}
      onClick={onSmash}
      className={`${bgColor}  rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm hover:${bgHover} focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800`}
    >
      {children}
    </button>
  );
}
