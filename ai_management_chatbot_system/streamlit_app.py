import streamlit as st

st.set_page_config(
    page_title="AI Management Chatbot System",
    page_icon="🤖",
    layout="wide"
)

st.sidebar.title("AI Management")

page = st.sidebar.radio(
    "Navigation",
    (
        "🏠 Home",
        "👤 Users",
        "📚 Subjects",
        "👨‍🏫 Instructors",
        "🤖 Chatbot"
    )
)

if page == "🏠 Home":

    st.title("🤖 AI Management Chatbot System")

    st.markdown("---")

    st.subheader("Project Features")

    st.success("✅ User Management")

    st.success("✅ Subject Management")

    st.success("✅ Instructor Management")

    st.success("✅ AI Chatbot")

    st.success("✅ FastAPI Backend")

    st.success("✅ PostgreSQL Database")

    st.success("✅ LangChain + Groq")

    st.success("✅ Streamlit Frontend")

elif page == "👤 Users":

    from streamlit_pages.users import users_page

    users_page()

elif page == "📚 Subjects":

    from streamlit_pages.subjects import subjects_page

    subjects_page()

elif page == "👨‍🏫 Instructors":

    from streamlit_pages.instructors import instructors_page

    instructors_page()

elif page == "🤖 Chatbot":

    from streamlit_pages.chatbot import chatbot_page

    chatbot_page()