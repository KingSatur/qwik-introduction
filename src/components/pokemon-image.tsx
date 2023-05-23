/* eslint-disable qwik/jsx-img */
import {
  component$,
  useComputed$,
  useSignal,
  useTask$,
} from "@builder.io/qwik";

interface Props {
  pokemonId: number;
  size?: number;
  showBackImage?: boolean;
  isVisible?: boolean;
}

export const PokemonImage = component$(
  ({ pokemonId, size = 300, showBackImage = false, isVisible }: Props) => {
    const isImageLoaded = useSignal<boolean>(false);

    const imageUrl = useComputed$(() => {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        showBackImage ? "/back/" + pokemonId : pokemonId
      }.png`;
    });

    useTask$(({ track }) => {
      track(() => pokemonId);
      isImageLoaded.value = false;
    });

    return (
      <div
        class="flex items-center justify-center mb-2"
        style={{ width: `${size}.px`, height: `${size}.px` }}
      >
        {!isImageLoaded.value && <span>Loading.....</span>}
        <img
          src={imageUrl.value}
          alt=""
          class={[
            { hidden: !isImageLoaded.value, "brightness-0": isVisible },
            "transition-all",
          ]}
          style={{ width: size || "500px" }}
          onLoad$={() => {
            isImageLoaded.value = true;
          }}
        />
      </div>
    );
  }
);
