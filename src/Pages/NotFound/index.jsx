import Template from '../../Layouts/Template';

export default function NotFound() {
  return (
    <Template>
      <div className="w-full flex align-items justify-center">
        <img className="w-1/4 transition delay-100 duration-300 ease-in-out hover:invert" src="/src/assets/not-found.jpg"></img>
      </div>
    </Template>
  )
}
