export default function Wavelist ({ allWaves }) {
  const shortenedAddress = address =>
    `${address.substring(0, 5)}...${address.substring(address.length - 4)}`
  const format = (date, locale, options) =>
    new Intl.DateTimeFormat(locale, options).format(date)

  return (
    <ul className="flex flex-col items-center gap-4 m-4">
      {allWaves.map((wave, index) => (
          <li
            className="w-full bg-neutral-800 hover:bg-gradient-to-r from-pink-900 to-yellow-800 rounded-lg shadow-neutral-500 p-6"
            key={index}
          >
            <p>
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-cyan-400">
                {wave.message}{" "}
              </span>
              from {shortenedAddress(wave.address)} @{" "}
              {format(wave.timestamp, 'es', {
                dateStyle: "short",
                timeStyle: 'short'
              })}
            </p>
          </li>
        ))
      }
    </ul>
  )
}