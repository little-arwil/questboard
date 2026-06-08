import { features } from "@/data/mockData";

export function Features() {
  return (
    <section id="fitur" className="section-pad" aria-labelledby="features-title">
      <div className="quest-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-violet">
            Fitur
          </p>
          <h2 id="features-title" className="mt-3 text-3xl font-black tracking-normal text-white sm:text-4xl">
            Semua sinyal penting sebelum party dibentuk.
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="glass-panel rounded-md p-5 transition hover:-translate-y-1 hover:border-violet/40"
              >
                <div className="mb-5 grid size-11 place-items-center rounded-md bg-violet/12 text-violet">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-black tracking-normal text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-parchment/68">{feature.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
