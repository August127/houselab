import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getGeminiClient(): GoogleGenAI {
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '1mb' }));

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // POST /api/prompts/suggest-improvements
  // Analyzes a prompt's current structure and suggests actionable improvements using Gemini
  app.post('/api/prompts/suggest-improvements', async (req, res) => {
    try {
      const {
        title,
        role,
        level,
        situation,
        template,
        variables,
        recommendedTools,
        agentType,
      } = req.body || {};

      if (!template || typeof template !== 'string') {
        res.status(400).json({
          error: 'Thiếu nội dung câu lệnh mẫu (template) để phân tích.',
        });
        return;
      }

      const ai = getGeminiClient();

      const variableNames = Array.isArray(variables)
        ? variables.map((v: { label?: string; key?: string }) => v.label || v.key).join(', ')
        : 'Không có';

      const promptInput = `Bạn là Chuyên gia Kỹ thuật Prompt (Prompt Engineering Architect) chuyên tối ưu hóa câu lệnh AI cho nhân viên văn phòng Việt Nam.
Hãy phân tích cấu trúc câu lệnh (Prompt) dưới đây theo chuẩn Công thức 4 bước (1. Vai trò - Role, 2. Bối cảnh - Context, 3. Nhiệm vụ & Ràng buộc - Task & Constraints, 4. Định dạng đầu ra - Output Format) và đề xuất cách cải tiến cụ thể để đạt kết quả thực tế sắc bén, chính xác và ít chung chung hơn.

THÔNG TIN PROMPT HIỆN TẠI:
- Tiêu đề: ${title || 'Không rõ'}
- Phòng ban: ${role || 'Văn phòng'}
- Cấp độ kỹ năng: ${level || 'Cơ bản'}
${agentType ? `- Loại AI Agent: ${agentType}\n` : ''}- Tình huống sử dụng: ${situation || 'Không rõ'}
- Công cụ khuyến nghị: ${Array.isArray(recommendedTools) ? recommendedTools.join(', ') : 'Claude, ChatGPT, Gemini'}
- Các biến số hiện có: ${variableNames}
- Nội dung Prompt gốc:
"""
${template}
"""

Hãy trả về kết quả phân tích chi tiết bằng tiếng Việt rõ ràng, thực chiến, súc tích dành cho dân công sở.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptInput,
        config: {
          systemInstruction:
            'Bạn là chuyên gia tối ưu hóa Prompt AI cho nhân sự văn phòng Việt Nam. Phân tích khách quan, thực tế, giữ nguyên định dạng biến số nằm trong ngoặc vuông [Tên biến] khi viết bản Prompt nâng cấp.',
          temperature: 0.4,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              overallScore: {
                type: Type.INTEGER,
                description:
                  'Điểm đánh giá độ hoàn thiện của Prompt gốc trên thang 100 (ví dụ: 78).',
              },
              summaryVerdict: {
                type: Type.STRING,
                description:
                  'Nhận xét tổng quan 1-2 câu về ưu điểm và điểm nghẽn lớn nhất của câu lệnh hiện tại.',
              },
              structureAudit: {
                type: Type.OBJECT,
                properties: {
                  roleClarity: {
                    type: Type.STRING,
                    description: 'Đánh giá ngắn gọn phần xác lập Vai trò chuyên gia (Role).',
                  },
                  contextDepth: {
                    type: Type.STRING,
                    description: 'Đánh giá độ sâu của Bối cảnh & Dữ liệu đầu vào (Context).',
                  },
                  taskConstraints: {
                    type: Type.STRING,
                    description:
                      'Đánh giá các Ràng buộc kiểm soát chất lượng & tránh bịa đặt (Constraints).',
                  },
                  outputFormat: {
                    type: Type.STRING,
                    description:
                      'Đánh giá độ rõ ràng của Định dạng kết quả đầu ra (Output Format).',
                  },
                },
                required: [
                  'roleClarity',
                  'contextDepth',
                  'taskConstraints',
                  'outputFormat',
                ],
              },
              strengths: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '2-3 điểm mạnh nổi bật của cấu trúc Prompt hiện tại.',
              },
              improvements: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: {
                      type: Type.STRING,
                      description: 'Tên hạng mục cần cải tiến (ngắn gọn).',
                    },
                    reason: {
                      type: Type.STRING,
                      description: 'Vì sao điểm này giúp AI trả lời trúng ý hơn.',
                    },
                    suggestion: {
                      type: Type.STRING,
                      description: 'Câu lệnh hoặc ràng buộc cụ thể nên bổ sung.',
                    },
                  },
                  required: ['title', 'reason', 'suggestion'],
                },
                description: '3 gợi ý cải tiến quan trọng nhất.',
              },
              suggestedVariables: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description:
                  '2-3 biến số dạng [Tên biến] gợi ý thêm vào để cá nhân hóa sâu hơn.',
              },
              optimizedPrompt: {
                type: Type.STRING,
                description:
                  'Phiên bản Prompt đã được nâng cấp hoàn chỉnh theo cấu trúc 4 bước, giữ lại các biến [Tên biến] gốc và tích hợp thêm các ràng buộc nâng cao.',
              },
              proTip: {
                type: Type.STRING,
                description:
                  '1 mẹo nhỏ khi chạy câu lệnh này trên Claude, ChatGPT hoặc Gemini.',
              },
            },
            required: [
              'overallScore',
              'summaryVerdict',
              'structureAudit',
              'strengths',
              'improvements',
              'suggestedVariables',
              'optimizedPrompt',
              'proTip',
            ],
          },
        },
      });

      const rawText = response.text;
      if (!rawText) {
        throw new Error('Không nhận được phản hồi phân tích từ mô hình Gemini.');
      }

      const parsed = JSON.parse(rawText.trim());
      res.json(parsed);
    } catch (error: unknown) {
      console.error('Error in /api/prompts/suggest-improvements:', error);
      const message =
        error instanceof Error
          ? error.message
          : 'Đã xảy ra lỗi khi phân tích câu lệnh với Gemini API.';
      res.status(500).json({ error: message });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
