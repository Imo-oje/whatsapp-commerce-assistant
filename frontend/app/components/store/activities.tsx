import { Ellipsis } from "lucide-react";

export default function Activities() {
  return (
    <div className="bg-white p-2 rounded-xl flex-1 w-full h-full">
      <h3 className="font-semibold mb-2">Activities</h3>
      <div className="pt-2">
        <div className="flex items-start justify-between p-2">
          <div className="flex items-center gap-4">
            <div className="border min-w-10 min-h-10 rounded-full flex items-center justify-center uppercase cursor-pointer">
              ES
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold">
                Alena Curtis -{" "}
                <span className="text-gray-600 font-light text-xs">
                  Just now
                </span>
              </h3>

              <p className="leading-5 font-normal text-sm line-clamp-2">
                Received their evusoeirgsdfsd oeuirh eruihof a new laptop in
                Benin city.
              </p>
            </div>
          </div>{" "}
          <span className="cursor-pointer">
            <Ellipsis color="#4a5565" size={16} />
          </span>
        </div>
        <div className="flex items-start justify-between p-2">
          <div className="flex items-center gap-4">
            <div className="border min-w-10 min-h-10 rounded-full flex items-center justify-center uppercase cursor-pointer">
              ES
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold">
                Mufasa Savvy -{" "}
                <span className="text-gray-600 font-light text-xs">
                  43 min ago
                </span>
              </h3>

              <p className="leading-5 font-normal text-sm line-clamp-2">
                Your message to leo has been sent.
              </p>
            </div>
          </div>{" "}
          <span className="cursor-pointer">
            <Ellipsis color="#4a5565" size={16} />
          </span>
        </div>
        <div className="flex items-start justify-between p-2">
          <div className="flex items-center gap-4">
            <div className="border min-w-10 min-h-10 rounded-full flex items-center justify-center uppercase cursor-pointer">
              ES
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold">
                Magnus Carlson -{" "}
                <span className="text-gray-600 font-light text-xs">
                  51 min ago
                </span>
              </h3>

              <p className="leading-5 font-normal text-sm line-clamp-2">
                Purchased three classical chessboards - GM EXCLUSIVES.
              </p>
            </div>
          </div>{" "}
          <span className="cursor-pointer">
            <Ellipsis color="#4a5565" size={16} />
          </span>
        </div>
        <div className="flex items-start justify-between p-2">
          <div className="flex items-center gap-4">
            <div className="border min-w-10 min-h-10 rounded-full flex items-center justify-center uppercase cursor-pointer">
              ES
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold">
                Magnus Carlson -{" "}
                <span className="text-gray-600 font-light text-xs">
                  51 min ago
                </span>
              </h3>

              <p className="leading-5 font-normal text-sm line-clamp-2">
                Purchased three classical chessboards - GM EXCLUSIVES.
              </p>
            </div>
          </div>{" "}
          <span className="cursor-pointer">
            <Ellipsis color="#4a5565" size={16} />
          </span>
        </div>
        <div className="flex items-start justify-between p-2">
          <div className="flex items-center gap-4">
            <div className="border min-w-10 min-h-10 rounded-full flex items-center justify-center uppercase cursor-pointer">
              ES
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold">
                Sansa Stark -{" "}
                <span className="text-gray-600 font-light text-xs">4h ago</span>
              </h3>

              <p className="leading-5 font-normal text-sm line-clamp-2">
                Received their order i dfjnsdlfjds klfjnwe qer erqw foi
                evusoeirgsdfsd oeuirh eruihof a new laptop in Benin city.
              </p>
            </div>
          </div>{" "}
          <span className="cursor-pointer">
            <Ellipsis color="#4a5565" size={16} />
          </span>
        </div>
        <div className="flex items-start justify-between p-2">
          <div className="flex items-center gap-4">
            <div className="border min-w-10 min-h-10 rounded-full flex items-center justify-center uppercase cursor-pointer">
              ES
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold">
                Magnus Carlson -{" "}
                <span className="text-gray-600 font-light text-xs">
                  51 min ago
                </span>
              </h3>

              <p className="leading-5 font-normal text-sm line-clamp-2">
                Purchased three classical chessboards - GM EXCLUSIVES.
              </p>
            </div>
          </div>{" "}
          <span className="cursor-pointer">
            <Ellipsis color="#4a5565" size={16} />
          </span>
        </div>
      </div>
    </div>
  );
}
