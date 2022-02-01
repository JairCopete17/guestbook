export default function Message ({ count }) {
  return (
    <div className="bg-neutral-800 rounded-lg shadow-neutral-500 m-4 p-6">
      <p className="pb-6 md:pb-2">Here is the space where you can drop your gm</p>
      {count === 0
        ? <>
            <p>Write your gm on the blockchain</p>
            <p className="text-xs text-neutral-500">contract runs on rinkeby network</p>
          </>
        : <p className="">Already{" "}
            <span className="">
              {count} ppl
            </span> drop their gm!
          </p>
      }
    </div>
  )
}