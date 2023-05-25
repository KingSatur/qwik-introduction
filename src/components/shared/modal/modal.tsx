import type { PropFunction } from "@builder.io/qwik";
import { Slot, component$, useStylesScoped$ } from "@builder.io/qwik";
import ModalStyles from "./modal.css?inline";

interface Props {
  showModal: boolean;
  closeFn: PropFunction<() => void>;
  isPersistent?: boolean;
  size?: "md" | "sm" | "lg";
}

export const Modal = component$<Props>(
  ({ showModal, closeFn, isPersistent = false, size = "md" }) => {
    useStylesScoped$(ModalStyles);

    return (
      <div
        id="modal-content"
        onClick$={(event) => {
          const elementId = (event.target as HTMLElement).id;
          if (elementId === "modal-content" && !isPersistent) {
            closeFn();
          }
        }}
        class={showModal ? "modal-background" : "hidden"}
      >
        <div class={["modal-content", `modal-${size}`]}>
          <div class="mt-3 text-center">
            <h3 class="modal-title">
              <Slot name="title" />
            </h3>

            <div class="mt-2 px-7 py-3">
              <div class="modal-content-text">
                <Slot name="content" />
              </div>
            </div>
            <div class="items-center px-4 py-3">
              <button onClick$={closeFn} id="ok-btn" class="modal-button">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
