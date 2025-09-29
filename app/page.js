"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const LANGS = [
  { id: "js", label: "JavaScript", ext: "js" },
  { id: "py", label: "Python", ext: "py" },
  { id: "java", label: "Java", ext: "java" },
  { id: "cpp", label: "C++", ext: "cpp" },
];

const QUESTIONS = [
  // Easy (4)
  { id: 1, difficulty: "Easy", points: 50, prompt: "Input: two integers a, b. Output: a + b.\nConstraints: -1e9 ≤ a,b ≤ 1e9.", stub: "export default function solve(a, b) {\n  // TODO\n}\n", tests: [
      { in: [1, 2], out: 3 },
      { in: [-3, 3], out: 0 },
    ] },
  { id: 2, difficulty: "Easy", points: 50, prompt: "Input: string s. Output: number of vowels (a,e,i,o,u) in s.\nConstraints: 0 ≤ |s| ≤ 1e5.", stub: "export default function solve(s) {\n  // TODO\n}\n", tests: [
      { in: ["hello"], out: 2 },
      { in: ["xyz"], out: 0 },
    ] },
  { id: 3, difficulty: "Easy", points: 50, prompt: "Input: Fahrenheit f (number). Output: Celsius rounded to 2 decimals. c = (f-32)*5/9.", stub: "export default function solve(f) {\n  // TODO\n}\n", tests: [
      { in: [32], out: 0 },
      { in: [212], out: 100 },
    ] },
  { id: 4, difficulty: "Easy", points: 50, prompt: "Input: three numbers. Output: the maximum.\nConstraints: values fit in JS number.", stub: "export default function solve(a,b,c) {\n  // TODO\n}\n", tests: [
      { in: [1, 9, 3], out: 9 },
      { in: [-5, -1, -10], out: -1 },
    ] },

  // Medium (7)
  { id: 5, difficulty: "Medium", points: 75, prompt: "Palindrome check. Ignore non-alphanumerics and case.\nConstraints: 1 ≤ |s| ≤ 1e5.", stub: "export default function solve(s) {\n  // TODO\n}\n", tests: [
      { in: ["racecar"], out: true },
      { in: ["A man, a plan, a canal: Panama"], out: true },
      { in: ["hello"], out: false },
    ] },
  { id: 6, difficulty: "Medium", points: 75, prompt: "FizzBuzz up to n. Return an array of length n; multiples of 3 as 'Fizz', of 5 as 'Buzz', of both as 'FizzBuzz', else number as string.", stub: "export default function solve(n) {\n  // TODO\n}\n", tests: [
      { in: [5], out: ["1","2","Fizz","4","Buzz"] },
      { in: [1], out: ["1"] },
    ] },
  { id: 7, difficulty: "Medium", points: 75, prompt: "Reverse words in a sentence, keeping single spaces.\nConstraints: 1 ≤ |s| ≤ 1e5.", stub: "export default function solve(s) {\n  // TODO\n}\n", tests: [
      { in: ["hello world"], out: "world hello" },
      { in: ["a b c"], out: "c b a" },
    ] },
  { id: 8, difficulty: "Medium", points: 75, prompt: "Are two strings anagrams? Case-insensitive, ignore spaces.\nConstraints: 1 ≤ |s| ≤ 1e5.", stub: "export default function solve(a,b) {\n  // TODO\n}\n", tests: [
      { in: ["listen","silent"], out: true },
      { in: ["rat","car"], out: false },
    ] },
  { id: 9, difficulty: "Medium", points: 75, prompt: "Return count of unique integers in array.\nConstraints: 0 ≤ n ≤ 1e5; values in 32-bit range.", stub: "export default function solve(arr) {\n  // TODO\n}\n", tests: [
      { in: [[1,2,2,3,3,3]], out: 3 },
      { in: [[1,1,1]], out: 1 },
    ] },
  { id: 10, difficulty: "Medium", points: 75, prompt: "Two Sum: return indices [i,j] (i<j) whose values sum to target; return [-1,-1] if none.\nConstraints: 2 ≤ n ≤ 1e5.", stub: "export default function solve(nums, target) {\n  // TODO\n}\n", tests: [
      { in: [[2,7,11,15], 9], out: [0,1] },
      { in: [[3,2,4], 6], out: [1,2] },
    ] },
  { id: 11, difficulty: "Medium", points: 75, prompt: "Balanced Parentheses: given string with ()[]{}, return true if balanced.\nConstraints: 1 ≤ |s| ≤ 1e5.", stub: "export default function solve(s) {\n  // TODO\n}\n", tests: [
      { in: ["()[]{}"], out: true },
      { in: ["(]"], out: false },
    ] },

  // Hard (7)
  { id: 12, difficulty: "Hard", points: 100, prompt: "Length of Longest Increasing Subsequence.\nConstraints: 1 ≤ n ≤ 2e4.", stub: "export default function solve(nums) {\n  // TODO\n}\n", tests: [
      { in: [[10,9,2,5,3,7,101,18]], out: 4 },
      { in: [[0,1,0,3,2,3]], out: 4 },
    ] },
  { id: 13, difficulty: "Hard", points: 100, prompt: "Longest substring without repeating characters. Return length.\nConstraints: 1 ≤ |s| ≤ 1e5.", stub: "export default function solve(s) {\n  // TODO\n}\n", tests: [
      { in: ["abcabcbb"], out: 3 },
      { in: ["bbbbb"], out: 1 },
    ] },
  { id: 14, difficulty: "Hard", points: 100, prompt: "Merge intervals. Input: array of [start,end]. Output merged sorted intervals.", stub: "export default function solve(intervals) {\n  // TODO\n}\n", tests: [
      { in: [[[1,3],[2,6],[8,10],[15,18]]], out: [[1,6],[8,10],[15,18]] },
      { in: [[[1,4],[4,5]]], out: [[1,5]] },
    ] },
  { id: 15, difficulty: "Hard", points: 100, prompt: "Spiral order of a matrix. Return the elements in spiral order.", stub: "export default function solve(matrix) {\n  // TODO\n}\n", tests: [
      { in: [[[1,2,3],[4,5,6],[7,8,9]]], out: [1,2,3,6,9,8,7,4,5] },
      { in: [[[1,2],[3,4]]], out: [1,2,4,3] },
    ] },
  { id: 16, difficulty: "Hard", points: 100, prompt: "Coin Change: given coins and amount, return minimum coins to make amount, or -1.\nConstraints: 1 ≤ amount ≤ 1e4.", stub: "export default function solve(coins, amount) {\n  // TODO\n}\n", tests: [
      { in: [[1,2,5], 11], out: 3 },
      { in: [[2], 3], out: -1 },
    ] },
  { id: 17, difficulty: "Hard", points: 100, prompt: "Number of Islands: given grid of '1'/'0', return count of islands.", stub: "export default function solve(grid) {\n  // TODO\n}\n", tests: [
      { in: [[['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]], out: 3 },
      { in: [[['1']]], out: 1 },
    ] },
  { id: 18, difficulty: "Hard", points: 100, prompt: "Quick Sort: return a sorted copy of the array using quicksort (any correct implementation).", stub: "export default function solve(arr) {\n  // TODO\n}\n", tests: [
      { in: [[3,6,8,10,1,2,1]], out: [1,1,2,3,6,8,10] },
      { in: [[5,4,3,2,1]], out: [1,2,3,4,5] },
    ] },
];

function useCountdown(secondsStart) {
  const [secondsLeft, setSecondsLeft] = useState(secondsStart);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  return { secondsLeft, running, start: () => setRunning(true), stop: () => setRunning(false), reset: (s) => setSecondsLeft(s) };
}

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function difficultyClass(d) {
  const key = d.toLowerCase();
  return key;
}

export default function BytesOfFortune() {
  const [screen, setScreen] = useState("start");
  const [available, setAvailable] = useState(QUESTIONS.map((q) => q.id));
  const [currentId, setCurrentId] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [score, setScore] = useState(0);
  const [teamName, setTeamName] = useState("");
  const [spinAngle, setSpinAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [pointerBounce, setPointerBounce] = useState(false);
  const [showScores, setShowScores] = useState(false);

  const { secondsLeft, start, reset } = useCountdown(15 * 60);

  const questionsMap = useMemo(() => Object.fromEntries(QUESTIONS.map((q) => [q.id, q])), []);
  const remainingQuestions = available.map((id) => questionsMap[id]);

  useEffect(() => {
    if (screen === "game" && secondsLeft === 0) setScreen("end");
  }, [secondsLeft, screen]);

  useEffect(() => {
    if (screen === "game" && available.length === 0) setScreen("end");
  }, [available.length, screen]);

  // Load/persist team name
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = window.localStorage.getItem('bytes_of_fortune_team');
    if (saved && !teamName) setTeamName(saved);
  }, []);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (teamName) window.localStorage.setItem('bytes_of_fortune_team', teamName);
  }, [teamName]);

  // Persist final result when the game ends
  useEffect(() => {
    if (screen !== "end") return;
    if (typeof window === 'undefined') return;
    const key = "bytes_of_fortune_scores";
    const entry = {
      team: teamName && teamName.trim() ? teamName.trim() : "Team",
      score,
      solved: completed.length,
      total: QUESTIONS.length,
      at: new Date().toISOString(),
    };
    try {
      const raw = window.localStorage.getItem(key);
      const list = raw ? JSON.parse(raw) : [];
      list.push(entry);
      window.localStorage.setItem(key, JSON.stringify(list).slice(0, 10000));
    } catch {}
  }, [screen]);

  function begin() {
    reset(15 * 60);
    start();
    setScreen("game");
  }

  function onSpin() {
    if (spinning || remainingQuestions.length === 0) return;
    setSpinning(true);
    const segment = 360 / QUESTIONS.length;
    const targetIdx = Math.floor(Math.random() * remainingQuestions.length);
    const targetQuestion = remainingQuestions[targetIdx];
    const absoluteIndex = QUESTIONS.findIndex((q) => q.id === targetQuestion.id);
    const targetAngle = 360 * 6 + (absoluteIndex + 0.5) * segment; // 6 full spins plus center of segment
    const startAngle = spinAngle % 360;
    const delta = targetAngle - startAngle;
    const duration = 3500 + Math.random() * 1000;

    const startTs = performance.now();
    function animate(now) {
      const t = Math.min(1, (now - startTs) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const current = startAngle + delta * eased;
      setSpinAngle(current);
      if (t < 1) requestAnimationFrame(animate);
      else {
        setSpinning(false);
        setPointerBounce(true);
        setTimeout(() => setPointerBounce(false), 650);
        setCurrentId(targetQuestion.id);
      }
    }
    requestAnimationFrame(animate);
  }

  function markComplete(id) {
    if (completed.includes(id)) return;
    const q = questionsMap[id];
    setCompleted((c) => [...c, id]);
    setAvailable((a) => a.filter((x) => x !== id));
    setScore((s) => s + q.points);
    setCurrentId(null);
  }

  const current = currentId ? questionsMap[currentId] : null;

  return (
    <div className="min-h-screen p-6 sm:p-10">
      {screen === "start" && (
        <StartScreen onStart={begin} teamName={teamName} setTeamName={setTeamName} onShowScores={() => setShowScores(true)} />
      )}
      {screen === "game" && (
        <GameScreen
          secondsLeft={secondsLeft}
          onSpin={onSpin}
          spinning={spinning}
          pointerBounce={pointerBounce}
          spinAngle={spinAngle}
          questions={QUESTIONS}
          available={available}
          current={current}
          onCompleted={markComplete}
          completed={completed}
          score={score}
        />
      )}
      {screen === "end" && (
        <EndScreen score={score} total={completed.length} all={QUESTIONS.length} teamName={teamName} onShowScores={() => setShowScores(true)} />
      )}

      {showScores && (
        <ScoresModal onClose={() => setShowScores(false)} />
      )}
    </div>
  );
}

function StartScreen({ onStart, teamName, setTeamName, onShowScores }) {
  return (
    <div className="max-w-5xl mx-auto fade-in">
      <div className="mb-6">
        <div className="text-sm opacity-80" style={{ fontFamily: "var(--font-title)" }}>CESA</div>
      </div>
      <div className="text-center">
        <h1 className="title text-4xl sm:text-5xl tracking-wide mb-2">BYTES OF FORTUNE</h1>
        <p className="text-[#e9d5ff] max-w-2xl mx-auto">
          You have <span className="text-cyan-300 font-semibold">15 minutes</span> to solve as many questions as you can.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <div className="glass p-6">
          <div className="title text-lg text-center mb-3">RULES</div>
          <ul className="text-sm text-[#e9d5ff] space-y-2 list-disc pl-5">
            <li>Solve as many questions as you can in 15 minutes.</li>
            <li>Spin the wheel to get a question. Write complete, working code, then click “Mark as Complete” before spinning again.</li>
          </ul>
        </div>
        <div className="glass p-6">
          <div className="title text-lg text-center mb-3">JUDGING</div>
          <ul className="text-sm text-[#e9d5ff] space-y-2 list-disc pl-5">
            <li>After 15 minutes, your code will be evaluated with test cases to check correctness.</li>
            <li>Only properly submitted and complete code will be considered for scoring.</li>
          </ul>
        </div>
      </div>

      <div className="glass p-6 mt-6">
        <div className="title text-lg text-center mb-4">POINT SYSTEM</div>
        <div className="grid grid-cols-[1fr_auto] gap-y-3 text-sm max-w-md mx-auto">
          <div className="flex items-center gap-2"><span className="badge easy">Easy</span><span className="text-[#e9d5ff]">Question</span></div>
          <div className="text-right text-white font-semibold">50 Points</div>
          <div className="flex items-center gap-2"><span className="badge medium">Medium</span><span className="text-[#e9d5ff]">Question</span></div>
          <div className="text-right text-white font-semibold">75 Points</div>
          <div className="flex items-center gap-2"><span className="badge hard">Hard</span><span className="text-[#e9d5ff]">Question</span></div>
          <div className="text-right text-white font-semibold">100 Points</div>
        </div>
      </div>

      <div className="text-center mt-6 text-sm italic muted">Your fate lies in the spin & the code!</div>

      <div className="text-center mt-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-3">
          <input value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Team name"
                 className="glass p-3 text-sm focus-glow w-64" />
        </div>
        <div className="flex items-center justify-center gap-3">
          <button className="pixel-button focus-glow" onClick={onStart} aria-label="Start Challenge">Start Challenge</button>
          <button className="pixel-button focus-glow" onClick={onShowScores} aria-label="View Scores">View Scores</button>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, body }) {
  return (
    <div className="glass p-4">
      <div className="font-semibold text-sm mb-1" style={{ fontFamily: "var(--font-title)" }}>{title}</div>
      <div className="text-sm text-[#e9d5ff]">{body}</div>
    </div>
  );
}

function GameScreen({ secondsLeft, onSpin, spinning, pointerBounce, spinAngle, questions, available, current, onCompleted, completed, score }) {
  const minutes = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const urgent = secondsLeft <= 60;
  const warning = secondsLeft <= 300 && !urgent;
  return (
    <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-6">
      <div className="glass p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="title text-xl">Spin the Wheel</div>
          <div className={`text-lg ${urgent ? "text-red-400 pulse-red" : warning ? "text-yellow-300 pulse-amber" : "text-[#a5b4fc]"}`}
               style={{ fontFamily: "var(--font-title)" }}>{formatTime(secondsLeft)}</div>
        </div>
        <Wheel
          questions={questions}
          spinAngle={spinAngle}
          spinning={spinning}
          onSpin={onSpin}
          pointerBounce={pointerBounce}
        />
      </div>

      <div className="glass p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="title text-xl">Question</div>
          <div className="text-sm">Score: <span className="text-cyan-300 font-semibold">{score}</span></div>
        </div>
        {current ? (
          <QuestionPanel q={current} onCompleted={() => onCompleted(current.id)} />
        ) : (
          <div className="text-sm text-[#e9d5ff]">Spin to get a question. Remaining: {available.length}/{questions.length}</div>
        )}
        {completed.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {completed.map((id) => (
              <span key={id} className="badge" style={{ borderColor: "var(--secondary)", boxShadow: "0 0 10px var(--secondary-glow)" }}>Completed {id}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Wheel({ questions, spinAngle, onSpin, spinning, pointerBounce }) {
  const canvasRef = useRef(null);
  const [size, setSize] = useState(480);
  const radius = size / 2;
  const segmentAngle = (2 * Math.PI) / questions.length;

  useEffect(() => {
    function computeSize() {
      const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
      const target = vw < 640 ? Math.min(420, Math.max(300, Math.floor(vw * 0.8))) : Math.min(560, Math.floor(vw * 0.35));
      setSize(target);
    }
    computeSize();
    window.addEventListener('resize', computeSize);
    return () => window.removeEventListener('resize', computeSize);
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvasRef.current.width = size * dpr;
    canvasRef.current.height = size * dpr;
    canvasRef.current.style.width = `${size}px`;
    canvasRef.current.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate((spinAngle * Math.PI) / 180);

    questions.forEach((q, i) => {
      const start = i * segmentAngle;
      const end = start + segmentAngle;
      // alternating neon slices
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius - 6, start, end);
      const color = i % 2 === 0 ? "rgba(168,85,247,0.9)" : "rgba(232,121,255,0.9)";
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();

      // label
      ctx.save();
      ctx.rotate(start + segmentAngle / 2);
      ctx.translate((radius - 70), 0);
      ctx.fillStyle = "#0c0a1a";
      ctx.font = "12px 'Press Start 2P', system-ui";
      const label = `${q.difficulty} ${q.points}`;
      ctx.fillText(label, -ctx.measureText(label).width / 2, 4);
      ctx.restore();
    });

    ctx.restore();
    // neon rim
    ctx.strokeStyle = "#22d3ee";
    ctx.lineWidth = 4;
    ctx.shadowColor = "rgba(34,211,238,0.9)";
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 4, 0, Math.PI * 2);
    ctx.stroke();
  }, [questions, spinAngle, size]);

  useEffect(() => {
    const onKey = (e) => { if (e.code === "Space") { e.preventDefault(); onSpin(); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onSpin]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`wheel-pointer ${pointerBounce ? "pointer-bounce" : ""}`} />
      <canvas ref={canvasRef} onClick={onSpin} className={`${spinning ? "cursor-wait" : "cursor-pointer"}`} />
      <button className="pixel-button" onClick={onSpin} disabled={spinning}>{spinning ? "Spinning..." : "Spin (Space)"}</button>
    </div>
  );
}

function QuestionPanel({ q, onCompleted }) {
  const [lang, setLang] = useState("js");
  const [codeByLang, setCodeByLang] = useState(() => initializeCodeMap(q));
  const code = codeByLang[lang] ?? "";
  const [results, setResults] = useState([]);
  const [allPass, setAllPass] = useState(false);

  // Reset code map when question changes
  useEffect(() => {
    setLang("js");
    setCodeByLang(initializeCodeMap(q));
    setResults([]);
    setAllPass(false);
  }, [q.id]);

  function runTests() {
    if (lang !== "js") return; // tests supported only in JS
    const outputs = [];
    let passCount = 0;
    try {
      // eslint-disable-next-line no-new-func
      const mod = new Function(`${code}; return typeof solve === 'function' ? solve : (typeof exports !== 'undefined' && exports.default) || null;`)();
      const solveFn = typeof mod === "function" ? mod : null;
      if (!solveFn) throw new Error("No default function `solve` found.");
      for (const t of q.tests) {
        const got = solveFn.apply(null, t.in);
        const ok = deepEqual(got, t.out);
        outputs.push({ input: t.in, expected: t.out, got, ok });
        if (ok) passCount++;
      }
      setResults(outputs);
      setAllPass(outputs.length > 0 && passCount === outputs.length);
    } catch (e) {
      setResults([{ error: String(e) }]);
      setAllPass(false);
    }
  }

  function resetStub() {
    const fresh = initializeCodeMap(q);
    setCodeByLang(fresh);
    setResults([]);
    setAllPass(false);
    persistCode(q.id, lang, fresh[lang]);
  }

  function onChangeCode(next) {
    setCodeByLang((prev) => {
      const updated = { ...prev, [lang]: next };
      return updated;
    });
    persistCode(q.id, lang, next);
  }

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <span className={`badge ${difficultyClass(q.difficulty).toLowerCase()}`}>{q.difficulty}</span>
        <span className="text-sm text-cyan-300">{q.points} pts</span>
      </div>
      <div className="text-sm mb-2 text-[#e9d5ff]">{q.prompt}</div>
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <label className="text-xs muted" htmlFor={`lang-${q.id}`}>Language</label>
        <select id={`lang-${q.id}`} value={lang} onChange={(e) => setLang(e.target.value)} className="glass p-2 text-xs focus-glow">
          {LANGS.map((l) => (
            <option key={l.id} value={l.id}>{l.label}</option>
          ))}
        </select>
        <span className="text-[11px] text-yellow-300">{lang === "js" ? "Tests: Enabled" : "Tests: Available in JavaScript only"}</span>
      </div>
      {q.tests && q.tests.length > 0 && (
        <div className="glass p-3 mb-3">
          <div className="title text-xs mb-2">EXAMPLES</div>
          <div className="space-y-2 text-xs">
            {q.tests.slice(0, 2).map((t, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <div className="muted">Input</div>
                  <pre className="whitespace-pre-wrap break-words bg-transparent text-[#e9d5ff]">{JSON.stringify(t.in)}</pre>
                </div>
                <div>
                  <div className="muted">Expected Output</div>
                  <pre className="whitespace-pre-wrap break-words bg-transparent text-[#e9d5ff]">{JSON.stringify(t.out)}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <textarea value={code} onChange={(e) => onChangeCode(e.target.value)} spellCheck={false}
        className="w-full h-64 sm:h-80 glass p-3 font-mono text-sm outline-none" />
      <div className="mt-3 flex items-center gap-2">
        <button className="pixel-button" onClick={runTests} disabled={lang !== "js"}>Run Tests</button>
        <button className="pixel-button" onClick={resetStub}>Reset</button>
        {allPass && (
          <button className="pixel-button" onClick={onCompleted}>Mark as Complete</button>
        )}
      </div>
      <div className="mt-3 space-y-2">
        {results.map((r, i) => (
          <div key={i} className="glass p-2 text-xs">
            {r.error ? (
              <div className="text-red-300">{r.error}</div>
            ) : (
              <div className={r.ok ? "text-green-300" : "text-red-300"}>
                <div>Input: {JSON.stringify(r.input)}</div>
                <div>Expected: {JSON.stringify(r.expected)}</div>
                <div>Got: {JSON.stringify(r.got)}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function deepEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a !== typeof b) return false;
  if (a && b && typeof a === "object") {
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    if (Array.isArray(a)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) if (!deepEqual(a[i], b[i])) return false;
      return true;
    }
    const ka = Object.keys(a);
    const kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    for (const k of ka) if (!deepEqual(a[k], b[k])) return false;
    return true;
  }
  return false;
}

function initializeCodeMap(q) {
  const js = q.stub;
  const py = `def solve(*args):\n    # TODO\n    pass\n`;
  const java = `public class Main {\n    public static Object solve(Object... args) {\n        // TODO\n        return null;\n    }\n}\n`;
  const cpp = `#include <bits/stdc++.h>\nusing namespace std;\n\n// You may change signature as needed for local testing\nint main(){\n    // TODO\n    return 0;\n}\n`;
  // load from localStorage if exists
  if (typeof window !== 'undefined') {
    const saved = window.localStorage.getItem(`q_${q.id}_codes`);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
  }
  const initial = { js, py, java, cpp };
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(`q_${q.id}_codes`, JSON.stringify(initial));
  }
  return initial;
}

function persistCode(qid, lang, value) {
  if (typeof window === 'undefined') return;
  const key = `q_${qid}_codes`;
  const saved = window.localStorage.getItem(key);
  let map = { js: '', py: '', java: '', cpp: '' };
  try { if (saved) map = JSON.parse(saved); } catch {}
  map[lang] = value;
  window.localStorage.setItem(key, JSON.stringify(map));
}

function EndScreen({ score, total, all, teamName, onShowScores }) {
  const success = total === all;
  return (
    <div className="max-w-3xl mx-auto glass p-6 sm:p-10 text-center fade-in">
      <div className="title text-3xl mb-3">{success ? "All Solved!" : "Time's Up!"}</div>
      <div className="text-[#e9d5ff] mb-4">{teamName && teamName.trim() ? teamName : "Team"} • Solved {total}/{all} • Total Score {score}</div>
      <div className="flex items-center justify-center gap-3 mb-2">
        <button className="pixel-button" onClick={onShowScores}>View Scores</button>
      </div>
      <div className="text-sm muted">Refresh the page to play again.</div>
    </div>
  );
}

function ScoresModal({ onClose }) {
  if (typeof window === 'undefined') return null;
  let rows = [];
  try {
    const raw = window.localStorage.getItem('bytes_of_fortune_scores');
    rows = raw ? JSON.parse(raw) : [];
  } catch {}
  rows = rows.slice(-20).reverse();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative glass p-4 sm:p-6 max-w-2xl w-[90%] max-h-[80vh] overflow-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="title text-xl">Recent Scores</div>
          <button className="pixel-button" onClick={onClose}>Close</button>
        </div>
        {rows.length === 0 ? (
          <div className="text-sm text-[#e9d5ff]">No scores recorded yet.</div>
        ) : (
          <div className="text-xs sm:text-sm space-y-2">
            {rows.map((r, i) => (
              <div key={i} className="glass p-2 flex items-center justify-between">
                <div className="flex-1">{r.team}</div>
                <div className="w-28 text-center">{r.solved}/{r.total} solved</div>
                <div className="w-24 text-right text-cyan-300 font-semibold">{r.score}</div>
                <div className="w-44 text-right muted hidden sm:block">{new Date(r.at).toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
