LLVM Intro
==================

- Typical Compiler Pipeline
http://www.drdobbs.com/architecture-and-design/the-design-of-llvm/240001128?pgno=3

- LLVM
	- Set of low-level compiler toolchain components
	- Has a modular design, differentiated from historic compilers
	- It's IR format is unique and highly optimizable
- Historical compiler design was monolithic.
	- There wasn't a lot of sharing for different stages in the compiler processing pipeline
	- This becomes very bad as you add new languages and targets (i.e. platforms)
- Compilation pipeline:
	- Scanner
	- Lexing
	- Parsing
	- IR
		- = Abstract Syntax Tree?
	- IR Optimization
	- Semantic Analysis
	- Code generation
- LLVM is most well known for the IR and IR Optimizer
- Intermediate Representation (IR)
	- Approaches:
		- Structured
			- Graph-based
			- Tree-based
		- Flat, tuple-based
		- Flat, stack-based
	- LLVM IR
		- LLVM IR is a low-level language, similar to assembly
			- RISC-like architecture
			- Strongly-typed
				- This is unusual bc most assembly languages are untyped
			- Provides an infinite set of temporary registers
			- 3 different, isomorphic, representations
				- Text
				- In-memory (data structures)
				- bitcode
	- Reasons to compile to an IR:
		- Easier to do analysis and optimize
	- LLVM IR Optimizer
		- Python is often compiled to C, then gcc compiles to machine code
	
	#Comparison To Java
	
	- Java Bytecode is analogous to LLVM IR insofar as it is the input to the optimizer

- Typically in an LLVM-based compiler, the FE output is an AST which will ultimately get converted into LLVM IR
- Code Generator: the thing that translates the LLVM IR into native machine code


- TODO: understand the CLR better
	- GC
	- Can you have some memory managed components (e.g. audio server) in memory managed, runtime-wrapped languages
- TODO: role