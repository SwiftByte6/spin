export async function POST(request) {
  try {
    const { language, code } = await request.json();
    if (!language || !code) {
      return new Response(JSON.stringify({ error: "language and code are required" }), { status: 400 });
    }

    const langMap = { cpp: "c++", java: "java", py: "python", js: "javascript" };
    const pistonLang = langMap[language] || language;

    const runtimesRes = await fetch("https://emkc.org/api/v2/piston/runtimes", { cache: "no-store" });
    const runtimes = await runtimesRes.json();
    const candidates = runtimes.filter((r) => r.language === pistonLang);
    if (candidates.length === 0) {
      return new Response(JSON.stringify({ error: `No runtime found for ${pistonLang}` }), { status: 400 });
    }
    // pick the latest (last item is usually latest, but sort by version string length desc/lex desc as fallback)
    const runtime = candidates[candidates.length - 1];

    const extMap = { "c++": "cpp", java: "java", python: "py", javascript: "js" };
    const name = `main.${extMap[pistonLang] || "txt"}`;
    const execRes = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: pistonLang,
        version: runtime.version,
        files: [{ name, content: code }],
        stdin: "",
        args: [],
        compile_timeout: 10000,
        run_timeout: 10000,
        compile_memory_limit: -1,
        run_memory_limit: -1,
      }),
    });
    const exec = await execRes.json();
    return new Response(JSON.stringify(exec), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
}



