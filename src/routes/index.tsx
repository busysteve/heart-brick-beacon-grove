import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { Download, Layers, Sigma } from "lucide-react";
import { SourceView } from "@/components/source-view";
import { libraryFiles } from "@/lib/library-sources";

export const Route = createFileRoute("/")({ component: Home });

type Tab = "network" | "source" | "train";

const stages = [
  { name: "input", detail: "1 × 28 × 28" },
  { name: "conv1 + bn + relu", detail: "3×3, 16, stride 1 → 28×28" },
  { name: "layer1", detail: "2 basic blocks, 16, stride 1 → 28×28" },
  { name: "layer2", detail: "2 basic blocks, 32, stride 2 → 14×14" },
  { name: "layer3", detail: "2 basic blocks, 64, stride 2 → 7×7" },
  { name: "global average pool", detail: "64" },
  { name: "fc", detail: "10 logits" },
];

function Home() {
  const [tab, setTab] = useState<Tab>("network");
  const [query, setQuery] = useState("");
  const [activePath, setActivePath] = useState("include/resnet/algorithms.hpp");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return libraryFiles.filter((file) => !q || file.path.toLowerCase().includes(q));
  }, [query]);
  const active = libraryFiles.find((file) => file.path === activePath) ?? libraryFiles[0];
  const groups = useMemo(() => {
    const order: string[] = [];
    for (const file of filtered) if (!order.includes(file.group)) order.push(file.group);
    return order;
  }, [filtered]);

  return (
    <main className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs tracking-widest text-accent uppercase">C++ / CUDA</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">ResNet CUDA</h1>
            <p className="mt-2 max-w-xl text-muted">
              Convolutional residual blocks for MNIST. cuDNN owns conv, batch-norm, and pooling.
              cuBLAS owns the classifier. Thrust runs the same update math the host tests lock.
            </p>
          </div>
          <a
            href="/resnet-cuda.zip"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-accent px-4 font-medium text-accent-fg"
          >
            <Download className="size-4" aria-hidden />
            Download source
          </a>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-0 md:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="border-border md:border-r">
          <div className="px-4 py-4">
            <label className="mb-2 block text-xs font-medium text-muted" htmlFor="file-filter">
              Files
            </label>
            <input
              id="file-filter"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filter"
              className="h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg placeholder:text-muted"
            />
          </div>
          <nav className="hidden overflow-auto px-2 pb-6 md:block" aria-label="Library files">
            {groups.map((group) => (
              <div key={group} className="mb-3">
                <p className="px-2 py-1 font-mono text-xs text-muted">{group}</p>
                {filtered
                  .filter((file) => file.group === group)
                  .map((file) => (
                    <button
                      key={file.path}
                      type="button"
                      title={file.path}
                      onClick={() => {
                        setActivePath(file.path);
                        setTab("source");
                      }}
                      className={`block w-full truncate rounded-md px-2 py-2 text-left font-mono text-xs ${
                        file.path === active.path && tab === "source"
                          ? "bg-raised text-accent"
                          : "text-fg hover:bg-surface"
                      }`}
                    >
                      {file.path.split("/").slice(-1)[0]}
                    </button>
                  ))}
              </div>
            ))}
          </nav>
        </aside>

        <section className="min-w-0 px-4 py-4">
          <div className="mb-4 flex gap-2" role="tablist" aria-label="Library sections">
            <TabButton id="network" current={tab} onSelect={setTab} icon={<Layers className="size-4" aria-hidden />}>
              Network
            </TabButton>
            <TabButton id="source" current={tab} onSelect={setTab}>
              Source
            </TabButton>
            <TabButton id="train" current={tab} onSelect={setTab} icon={<Sigma className="size-4" aria-hidden />}>
              Train
            </TabButton>
          </div>

          {tab === "network" ? <NetworkPane /> : null}
          {tab === "source" ? (
            <div>
              <label className="mb-2 block text-xs text-muted md:hidden" htmlFor="file-pick">
                Open file
              </label>
              <select
                id="file-pick"
                className="mb-3 h-11 w-full rounded-md border border-border bg-surface px-3 font-mono text-sm md:hidden"
                value={active.path}
                onChange={(event) => setActivePath(event.target.value)}
              >
                {(filtered.some((file) => file.path === active.path) ? filtered : [active, ...filtered]).map(
                  (file) => (
                    <option key={file.path} value={file.path}>
                      {file.path}
                    </option>
                  ),
                )}
              </select>
              <div className="mb-3 flex items-baseline justify-between gap-3">
                <h2 className="truncate font-mono text-sm text-accent">{active.path}</h2>
                <p className="shrink-0 text-xs text-muted">{active.code.split("\n").length} lines</p>
              </div>
              <SourceView code={active.code} />
            </div>
          ) : null}
          {tab === "train" ? <TrainPane /> : null}
        </section>
      </div>
    </main>
  );
}

function TabButton({
  id,
  current,
  onSelect,
  children,
  icon,
}: {
  id: Tab;
  current: Tab;
  onSelect: (tab: Tab) => void;
  children: string;
  icon?: ReactNode;
}) {
  const selected = current === id;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={() => onSelect(id)}
      className={`inline-flex h-11 items-center gap-2 rounded-md px-3 text-sm font-medium ${
        selected ? "bg-accent text-accent-fg" : "bg-surface text-fg"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function NetworkPane() {
  return (
    <div className="space-y-6">
      <p className="max-w-2xl text-muted">
        The default network is the CIFAR-style ResNet from He et al., narrowed for 28×28 grayscale.
        Convolutions have no bias. Batch-norm carries the affine scale and shift. A stage's first
        block uses the stage stride; the second is stride 1.
      </p>
      <ol className="space-y-2">
        {stages.map((stage, index) => (
          <li key={stage.name} className="grid grid-cols-[2rem_minmax(0,1fr)] items-center gap-3">
            <span className="font-mono text-xs text-muted">{index}</span>
            <div className="rounded-md border border-border bg-surface px-3 py-3">
              <p className="font-medium">{stage.name}</p>
              <p className="font-mono text-sm text-muted">{stage.detail}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="rounded-md border border-border bg-surface p-4">
        <h2 className="font-medium">Basic block</h2>
        <p className="mt-1 font-mono text-sm text-accent">y = ReLU(F(x) + S(x))</p>
        <div className="mt-4 grid gap-2">
          <div className="flex flex-wrap gap-2">
            {["conv 3×3", "bn", "relu", "conv 3×3", "bn"].map((chip) => (
              <span key={chip} className="rounded-md bg-raised px-3 py-2 font-mono text-sm">
                {chip}
              </span>
            ))}
          </div>
          <p className="text-sm text-muted">Shortcut S is identity, or a 1×1 convolution plus batch-norm when channels or stride change.</p>
          <div className="flex flex-wrap gap-2">
            {["add", "relu"].map((chip) => (
              <span key={chip} className="rounded-md bg-accent px-3 py-2 font-mono text-sm text-accent-fg">
                {chip}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-4 text-sm text-muted">
          Backward splits the gradient at the sum. The two branches are differentiated separately, then
          their input gradients are added with the Thrust <span className="font-mono text-fg">add</span> algorithm.
        </p>
      </div>

      <dl className="grid gap-3 sm:grid-cols-3">
        <Stat label="MNIST trainable" value="174,970" note="1 channel, 10 classes" />
        <Stat label="ResNet-18 trainable" value="11,689,512" note="3×1000, torchvision count" />
        <Stat label="Checkpoint" value="RESNET01" note="little-endian, named tensors" />
      </dl>
    </div>
  );
}

function Stat({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-md border border-border bg-surface p-4">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-1 font-mono text-lg text-accent">{value}</dd>
      <dd className="text-sm text-muted">{note}</dd>
    </div>
  );
}

function TrainPane() {
  return (
    <div className="space-y-6">
      <p className="max-w-2xl text-muted">
        Training does not run in this page. Build <span className="font-mono text-fg">mnist_train</span> on a
        machine with the CUDA toolkit and cuDNN, then point it at IDX files or the synthetic digits.
      </p>
      <pre className="overflow-auto rounded-md border border-border bg-surface p-4 font-mono text-sm leading-6 text-fg">
{`cmake -S . -B build -DCUDNN_ROOT_DIR=/usr
cmake --build build -j
./scripts/download_mnist.sh data/mnist
./build/mnist_train --data data/mnist --epochs 8 --batch 128 --lr 0.05 --checkpoint mnist.rsnt`}
      </pre>
      <ul className="grid gap-2 text-sm text-muted">
        <li><span className="font-mono text-fg">--arch resnet18</span> uses the 7×7 stem and a max-pool. On 28×28 it ends at 1×1.</li>
        <li><span className="font-mono text-fg">--adamw</span> swaps in decoupled weight decay. The default is momentum SGD, which is what the ResNet paper trains with.</li>
        <li>Learning rate drops by 10× halfway through and again at three quarters, when there are at least four epochs.</li>
        <li>The checkpoint stores weights and batch-norm running stats by name. Optimizer velocity is not saved.</li>
      </ul>
      <ReferenceMath />
    </div>
  );
}

function ReferenceMath() {
  const [logitA, setLogitA] = useState("0");
  const [logitB, setLogitB] = useState("0");
  const [label, setLabel] = useState(0);
  const [param, setParam] = useState("1");
  const [grad, setGrad] = useState("0.5");
  const [velocity, setVelocity] = useState("0");

  const a = Number(logitA);
  const b = Number(logitB);
  const p0 = Number(param);
  const g0 = Number(grad);
  const v0 = Number(velocity);
  const ce = softmaxPair(a, b, label);
  const sgd = sgdStep(p0, g0, v0, 0.1, 0.9, 0.1);

  return (
    <div className="rounded-md border border-border bg-surface p-4">
      <h2 className="font-medium">Host reference</h2>
      <p className="mt-1 text-sm text-muted">
        Same formulas as <span className="font-mono text-fg">softmax_cross_entropy_row</span> and{" "}
        <span className="font-mono text-fg">sgd_momentum_at</span>. The unit test locks the defaults:
        loss log(2), gradient −0.5 / 0.5, and the SGD step landing on 0.94.
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <fieldset className="space-y-3">
          <legend className="text-sm font-medium">Two-class cross-entropy</legend>
          <NumberField id="logit-a" label="logit 0" value={logitA} onChange={setLogitA} />
          <NumberField id="logit-b" label="logit 1" value={logitB} onChange={setLogitB} />
          <div>
            <p className="mb-1 text-xs text-muted">label</p>
            <div className="flex gap-2">
              {[0, 1].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setLabel(value)}
                  className={`h-11 flex-1 rounded-md font-mono ${label === value ? "bg-accent text-accent-fg" : "bg-raised text-fg"}`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <p className="font-mono text-sm">
            loss {fmt(ce.loss)}
            <br />
            grad {fmt(ce.grad[0])} , {fmt(ce.grad[1])}
          </p>
        </fieldset>
        <fieldset className="space-y-3">
          <legend className="text-sm font-medium">SGD, lr 0.1, momentum 0.9, decay 0.1</legend>
          <NumberField id="param" label="parameter" value={param} onChange={setParam} />
          <NumberField id="grad" label="gradient" value={grad} onChange={setGrad} />
          <NumberField id="velocity" label="velocity" value={velocity} onChange={setVelocity} />
          <p className="font-mono text-sm">
            parameter {fmt(sgd.param)}
            <br />
            velocity {fmt(sgd.velocity)}
          </p>
        </fieldset>
      </div>
    </div>
  );
}

function NumberField({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-xs text-muted" htmlFor={id}>
      {label}
      <input
        id={id}
        inputMode="decimal"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 h-11 w-full rounded-md border border-border bg-bg px-3 font-mono text-sm text-fg"
      />
    </label>
  );
}

function softmaxPair(a: number, b: number, label: number) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) return { loss: Number.NaN, grad: [Number.NaN, Number.NaN] };
  const max = Math.max(a, b);
  const ea = Math.exp(a - max);
  const eb = Math.exp(b - max);
  const sum = ea + eb;
  const logits = [a, b];
  const loss = max + Math.log(sum) - logits[label];
  const grad = [ea / sum - (label === 0 ? 1 : 0), eb / sum - (label === 1 ? 1 : 0)];
  return { loss, grad };
}

function sgdStep(param: number, grad: number, velocity: number, lr: number, momentum: number, decay: number) {
  if (![param, grad, velocity].every(Number.isFinite)) return { param: Number.NaN, velocity: Number.NaN };
  const g = grad + decay * param;
  const nextV = momentum * velocity + g;
  return { param: param - lr * nextV, velocity: nextV };
}

function fmt(value: number) {
  if (!Number.isFinite(value)) return "—";
  return value.toFixed(6).replace(/0+$/, "").replace(/\.$/, "");
}
