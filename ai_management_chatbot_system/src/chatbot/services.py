from src.chatbot.utils import ChatbotUtils


class ChatbotService:

    @staticmethod
    async def process_question(question: str):
        try:
            return await ChatbotUtils.ask_question(question)

        except Exception as e:
            raise Exception(f"Chatbot service failed: {e}")