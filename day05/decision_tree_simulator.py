"""
Day 5 – Introduction to Machine Learning Concepts
Task: Decision Tree Loan Approval Simulator

Description:
This program simulates a basic Decision Tree algorithm
used for loan approval decisions.

Inputs:
- Age
- Annual Income
- Credit Score

Decision Rules:
1. If age < 18 → Reject
2. Else if income < 30000 → Reject
3. Else if credit score < 600 → Reject
4. Otherwise → Approve

Purpose:
Demonstrates how decision trees use conditional logic
to make decisions step by step.
"""

print("=" * 50)
print("      Loan Approval Decision System")
print("=" * 50)

try:
    # Collect applicant information
    age = int(input("Enter applicant age: "))
    income = int(input("Enter annual income: "))
    credit_score = int(input("Enter credit score: "))

    print("\nDecision Evaluation Started")
    print("-" * 40)

    # Rule 1 → Age validation
    if age < 18:
        print("Decision: REJECTED")
        print("Reason: Applicant must be at least 18 years old.")

    # Rule 2 → Income validation
    elif income < 30000:
        print("Decision: REJECTED")
        print("Reason: Annual income does not meet requirements.")

    # Rule 3 → Credit score validation
    elif credit_score < 600:
        print("Decision: REJECTED")
        print("Reason: Credit score is below approval threshold.")

    # Final approval condition
    else:
        print("Decision: APPROVED")
        print("Reason: Applicant satisfies all approval conditions.")

    print("-" * 40)
    print("Decision Tree Execution Completed")

# Handle invalid input
except ValueError:
    print("\nError: Invalid input detected.")
    print("Please enter numeric values only.")

print("=" * 50)