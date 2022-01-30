export default function App () {
  const wave = () => {}

  return (
    <main className="mx-auto max-w-2xl py-12 md:min-h-screen md:py-0 flex flex-col items-center justify-center gap-6">
      <header className="flex items-center gap-4">
        <img
          src="https://emojicdn.elk.sh/🌞?style=apple"
          alt="Sun with face emoji"
          className="w-10 h-10 md:w-16 md:h-16"
        />
        <h1 className="text-4xl font-bold">Guestbook</h1>
      </header>
      <p className="px-8">Hey there, here is the space where you can drop your gm.</p>
      <button
        className=" flex items-center justify-center text-lg px-12 py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-yellow-600 hover:from-blue-600 hover:to-green-600 active:scale-75"
        onClick={wave}
      >
        gm
      </button>
    </main>
  )
}