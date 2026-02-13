import { useState } from "react";
import { useLocation } from "react-router";
import { getTownBySlug } from "../data/towns";
import { getTownSlugFromPathname } from "../utils/town";

type BookingStatus = "idle" | "submitting" | "success" | "error";

const accessKey = "96d91c44-fc4d-4e82-ac18-e989535234dd";

const serviceLabels: Record<string, string> = {
  weekly: "Weekly Campaign",
  party: "One-Off Party",
  workshop: "Workshop / Class",
  other: "Other",
};

function buildMessage(baseMessage: string, service: string, city: string) {
  const serviceLabel = serviceLabels[service] ?? service.trim();
  const interestedIn = serviceLabel
    ? `Interested In: ${serviceLabel}`
    : "Interested In: (not provided)";
  const cityLine = city ? `City: ${city}` : "City: (not provided)";

  return [interestedIn, cityLine, "", baseMessage.trim()].join("\n");
}

export function BookingWidget() {
  const { pathname } = useLocation();
  const townSlug = getTownSlugFromPathname(pathname);
  const town = getTownBySlug(townSlug);
  const sortedCities = [...town.cityOptions].sort((a, b) =>
    a.localeCompare(b)
  );
  const defaultCity = "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    city: defaultCity,
    message: "",
  });
  const [status, setStatus] = useState<BookingStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleReset() {
    setStatus("idle");
    setErrorMessage("");
    setFormData({
      name: "",
      email: "",
      service: "",
      city: defaultCity,
      message: "",
    });
  }

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const { name, email, message, service, city } = formData;

    const payload = new FormData();
    payload.append("access_key", accessKey);
    payload.append("name", name.trim());
    payload.append("email", email.trim());
    payload.append("message", buildMessage(message, service, city));

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });
      const data = (await response.json()) as { success?: boolean };

      if (!response.ok || !data.success) {
        setStatus("error");
        setErrorMessage(
          "Unable to send your request right now. Please try again."
        );
        return;
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        service: "",
        city: defaultCity,
        message: "",
      });
    } catch {
      setStatus("error");
      setErrorMessage(
        "Unable to send your request right now. Please try again."
      );
    }
  }

  return (
    <section id="booking" className="py-16 px-4 bg-parchment sm:py-24">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-ink-blue/10 flex flex-col md:flex-row">
        <div className="bg-ink-blue text-parchment px-6 py-10 sm:p-12 md:w-1/3 flex flex-col justify-center">
          <h3 className="text-3xl font-serif font-bold mb-4">
            Start Your Quest
          </h3>
          <p className="opacity-80 mb-6">
            Ready to roll initiative? Fill out the form to book a session or ask
            a question.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-dragon-red">✉️</span>
              <span>quest@thedicebard.com</span>
            </div>
            {/* Add more contacts if needed */}
          </div>
        </div>

        <div className="px-6 py-6 sm:p-12 md:w-2/3 bg-white">
          {status === "success" ? (
            <div className="rounded-2xl border border-ink-blue/10 bg-parchment/40 p-8 text-center">
              <h4 className="text-2xl font-serif font-bold text-ink-blue">
                Message Sent!
              </h4>
              <p className="mt-3 text-ink-blue/80">
                Thanks for reaching out. I will reply as soon as I can.
              </p>
              <button
                type="button"
                className="mt-6 w-full py-4 bg-dragon-red text-parchment font-serif font-bold text-lg rounded-lg hover:bg-red-800 transition-colors shadow-lg"
                onClick={handleReset}
              >
                Send Another
              </button>
            </div>
          ) : status === "error" ? (
            <div className="rounded-2xl border border-dragon-red/30 bg-parchment/40 p-8 text-center">
              <h4 className="text-2xl font-serif font-bold text-dragon-red">
                Something Went Wrong
              </h4>
              <p className="mt-3 text-ink-blue/80">
                {errorMessage ||
                  "Please try again in a moment or email directly."}
              </p>
              <button
                type="button"
                className="mt-6 w-full py-4 bg-dragon-red text-parchment font-serif font-bold text-lg rounded-lg hover:bg-red-800 transition-colors shadow-lg"
                onClick={handleReset}
              >
                Try Again
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-bold text-ink-blue mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-parchment/30 border border-ink-blue/20 focus:border-dragon-red focus:ring-1 focus:ring-dragon-red outline-none transition-all"
                    placeholder="Gandalf the Grey"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold text-ink-blue mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-parchment/30 border border-ink-blue/20 focus:border-dragon-red focus:ring-1 focus:ring-dragon-red outline-none transition-all"
                    placeholder="wizard@middleearth.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-bold text-ink-blue mb-2"
                  >
                    Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 rounded-lg bg-parchment/30 border border-ink-blue/20 focus:border-dragon-red focus:ring-1 focus:ring-dragon-red outline-none transition-all"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="">Select an adventure...</option>
                    <option value="weekly">Weekly Campaign</option>
                    <option value="party">One-Off Party</option>
                    <option value="workshop">Workshop / Class</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-bold text-ink-blue mb-2"
                  >
                    City
                  </label>
                  <select
                    id="city"
                    name="city"
                    className="w-full px-4 py-3 rounded-lg bg-parchment/30 border border-ink-blue/20 focus:border-dragon-red focus:ring-1 focus:ring-dragon-red outline-none transition-all"
                    value={formData.city}
                    onChange={handleChange}
                  >
                    <option value="">Select a city...</option>
                    {sortedCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  <option disabled value="">
                    ──────────
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-bold text-ink-blue mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-parchment/30 border border-ink-blue/20 focus:border-dragon-red focus:ring-1 focus:ring-dragon-red outline-none transition-all"
                  placeholder="Tell me about your party level and experience..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-dragon-red text-parchment font-serif font-bold text-lg rounded-lg hover:bg-red-800 transition-colors shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending..." : "Send Raven"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
