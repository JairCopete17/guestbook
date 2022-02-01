export default function Header () {
  return (
    <header className="flex items-center justify-center gap-4 p-4">
      <img
        src="https://emojicdn.elk.sh/📓?style=apple"
        alt="Notebook emoji"
        className="w-10 h-10 md:w-16 md:h-16"
      />
      <h1 className="text-4xl font-bold">Guestbook</h1>
    </header>
  )
}