### In-Depth Description

**Functional Increment**  
- Use OpenAI (via Spring AI's `ChatClient`) to generate a narrative for each slide.  
- Append transitional phrases (e.g., "Now let's talk about…").  
- Store the new text in `Slide.text_narration`.

**Objects / Components**  
- **LLMService**: A service that interacts with OpenAI to generate text.  
- **Endpoint**: `POST /api/projects/{id}/generate-narrative` calls the LLM for each slide.  
- **Slide Updates**: Each slide is updated with the generated text, stored in the database.

**Testing Criteria**  
1. **Unit Tests**  
   - Mock OpenAI responses to ensure correct text integration.  
   - Test error handling in case the LLM is unavailable.  
2. **E2E Tests**  
   - For a parsed project, trigger "Generate Narration" → verify that each slide's text is replaced or appended with AI-generated content.  
   - Confirm transitions are inserted properly.

**Instruction: Next Step**  
- After Step 9 is completed, move on to **Step 10: TTS & Video Generation (Synthesia Integration)**.

---