import Github from "./github";
import Linkedin from "./linkedin";

export default function Navbar() {
  return (
    <nav className="flex p-5 justify-end gap-5 ">
      <a
        href="https://github.com/Xeba7"
        target="_black"
        className="cursor-pointer hover:scale-105 transform-origin-center"
        alt="icono de Github"
      >
        <Github className="fill-white" />
      </a>
      <a
        href="https://cl.linkedin.com/in/sebasti%C3%A1n-cisterna-reyes-111a67256"
        target="_black"
        className="cursor-pointer hover:scale-[103%]  transform-origin-center py-1"
        alt="icono de linkedin"
      >
        <Linkedin className="fill-white" />
      </a>
    </nav>
  );
}
