package TP5;

import java.util.ArrayList;

public interface SetCalculatorInterface {
	public ArrayList<Object> union(ArrayList<Object> setA, ArrayList<Object> setB);
	public ArrayList<Object> intersection(ArrayList<Object> setA, ArrayList<Object> setB);
	public ArrayList<Object> difference(ArrayList<Object> setA, ArrayList<Object> setB);
	public ArrayList<Object> symDifference(ArrayList<Object> setA, ArrayList<Object> setB);

	public <T> ArrayList<T> isSubset(ArrayList<Object> setA, ArrayList<Object> setB);
	public <T> ArrayList<T> isSuperset(ArrayList<Object> setA, ArrayList<Object> setB);
}
