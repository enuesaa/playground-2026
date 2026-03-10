import { createSignal, JSX } from "solid-js";
import "./Counter.css";

export default function Counter() {
  const [count, setCount] = createSignal(0);

	const handleClick: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (e) => {
    e.preventDefault()
    setCount(count() + 1)
  }

  return (
    <button class="increment" onClick={handleClick} type="button">
      Clicks: {count()}
    </button>
  );
}
